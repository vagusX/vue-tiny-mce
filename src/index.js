import Vue from 'vue';

import {requireTheme, requireSkin, requireContentStyle, requirePlugins, generateId} from './utils';
import tinymce from './tinymce';

// Import default theme
requireTheme();

// Import default skin
requireSkin();

// Import available plugins
requirePlugins([
  'autoresize',
  'code',
  'link',
  'paste',
  'searchreplace'
]);

[
  'd2s',
  'image',
  'autofloat',
  'cursor',
].forEach(plugin => require(`./plugins/${plugin}`));

const defaultConfig = {
  // Import default content CSS for the corresponding skin
  content_style: requireContentStyle(),
  // Avoid `skin` to be loaded from URL
  skin: false,
};

const MCE_VUE = Vue.extend({
  props: {
    id: String,
    className: String,
    config: Object,
    events: Object,
    content: String,
    onChange: Function
  },
  data() {
    return {
      _isInit: false,
      _editor: {}
    }
  },
  template: '<textarea id={{id}} class={{className}} />',
  methods: {
    _init(config, content) {
      const _config = Object.assign({}, defaultConfig, config);
      this._isInit && this._remove();

      this.$el.style.hidden = 'hidden';

      _config.selector = `#${this.id}`;
      _config.setup = (editor) => {
        const events = this.events || {};
        for (let type in events) {
          const handler = events[type];
          if (typeof handler === 'function') {
            editor.on(type, (e) => {
              handler(e, editor);
            });
          }
        }
        editor.on('init', () => {
          this._editor = editor;
          content && editor.setContent(content);
        });

        // listen to change Event and respond
        editor.on('ExecCommand change NodeChange ObjectResized', () => {
          if (editor.isDirty()) {
            editor.save();
            let content = editor.getContent().trim();
            this.onChange && this.onChange(editor.getContent().trim());
          }
        })

        config.setup && config.setup(editor);
      };

      tinymce.init(_config);

      this.$el.style.hidden = '';

      this._isInit = true;
    },
    _remove() {
      tinymce.EditorManager.execCommand('mceRemoveEditor', true, this.id);
      this._isInit = false;
      this._editor = null;
    }
  },
  created() {
    this.id = this.id || generateId();
  },
  ready() {
    this._init(this.config, this.content);
  },
  beforeDestroy() {
    this._remove();
  }
})

export default MCE_VUE;

export {tinymce};
