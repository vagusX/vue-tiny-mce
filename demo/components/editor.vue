<template>
  <editor
    :config="config"
    :events="events"
    :content="content"
    :on-change="onChange"></editor>
</template>

<script>
import Editor from '../../lib/vue-tiny-mce';

const config = {
  statusbar: false,
  resize: false,
  menubar: '',
  toolbar: 'code | undo redo | bold removeformat link image searchreplace t_image t_d2s',
  plugins: 'autoresize code link searchreplace paste t_d2s t_image t_autofloat t_cursor',
  content_style:
    '*{line-height:25px;color:#555;font-size:15px;font-family:\'Hiragino Sans GB\',\'Microsoft YaHei\',\'黑体\',Helvetica,Arial,Tahoma,sans-serif;}' +
    'img{max-width:100%;}' +
    'img.size-overflowed{box-sizing:border-box;border:2px solid red;-webkit-filter:opacity(.4);filter:opacity(.4);}' +
    'table{width:100%}',
  extended_valid_elements: 'a[href|href-id|target=_blank|title]',
  convert_urls: false,
  paste_as_text: true,
  paste_data_images: true,
  autoresize_min_height: 500,
  //autofloat_top_offset: 50,
  setup,
};

function setup(editor) {
  editor.on('NodeChange SelectionChange', e => {
    const range = editor.selection.getRng();
    if (!range.collapsed) return;
    const dom = editor.dom;
    const el = dom.getParent(range.endContainer, 'strong');
    let cursorMoved;
    if (el) {
      if (el === range.endContainer.parentNode) {
        if (!range.endOffset) {
          range.setStartBefore(el);
          range.setEndBefore(el);
          cursorMoved = true;
        } else if (range.endOffset === range.endContainer.length) {
          range.setStartAfter(el);
          range.setEndAfter(el);
          cursorMoved = true;
        }
      }
    }
    cursorMoved && editor.selection.setRng(range);
  });
}

function handleUpload(e, editor) {
  const file = e.data;
  // ...
}

export default {
  components: {
    Editor
  },
  props: {
    content: String,
    onChange: Function
  },
  data() {
    return {
      config: config,
      events: {
        TUploadImage: handleUpload
      }
    }
  },
}
</script>
