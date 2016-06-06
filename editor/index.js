import Vue from 'vue';

import {requireTheme, requireSkin, requireContentStyle, requirePlugins, generateId} from './utils';
import tinymce from './tinymce';

// Import default theme
requireTheme();

// Import default skin
requireSkin();

// Import available plugins
requirePlugins([
  'advlist',
  'anchor',
  'autolink',
  'autoresize',
  'autosave',
  'bbcode',
  'charmap',
  'code',
  'codesample',
  'colorpicker',
  'contextmenu',
  'directionality',
  'emoticons',
  'fullpage',
  'fullscreen',
  'hr',
  'image',
  'imagetools',
  'importcss',
  'insertdatetime',
  'layer',
  'legacyoutput',
  'link',
  'lists',
  'media',
  'nonbreaking',
  'noneditable',
  'pagebreak',
  'paste',
  'preview',
  'print',
  'save',
  'searchreplace',
  'spellchecker',
  'tabfocus',
  'table',
  'template',
  'textcolor',
  'textpattern',
  'visualblocks',
  'visualchars',
  'wordcount',
]);
[
  'd2s',
  'simp-trad',
  'image',
  'autofloat',
  'cursor',
  //'markdown',
].forEach(plugin => require(`./plugins/${plugin}`));

const defaultConfig = {
  // Import default content CSS for the corresponding skin
  content_style: requireContentStyle(),
  // Avoid `skin` to be loaded from URL
  skin: false,
};

function isInlineTemplate(bool) {
  if (bool) {
    return '<div id={{id}} class={{className}}>{{{content}}}</div>';
  } else {
    return '<textarea id={{id}} class={{className}} />';
  }
}

const MCE_VUE = Vue.extend({
  props: ['id', 'className', 'config', 'content', 'events', 'changeCallback'],
  data() {
    return {
      _isInit: false,
      _editor: {}
    }
  },
  template: isInlineTemplate(true),
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
        editor.on('change', () => {
          // Set to `null` to mark a change in content
          this.content = null;
          // If `changeCallback` is provided, update cached content
          this.changeCallback && this.changeCallback(this.content = editor.getContent());
        });
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
