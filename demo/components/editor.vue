<template>
  <editor
    :config="config"
    :events="events"
    :content="content"
    :on-change="onChange"></editor>
</template>

<script>
import Editor from '../../lib/vue-tiny-mce';
// import {upload, getUrl} from '#/services/uploader';

const config = {
  statusbar: false,
  resize: false,
  menubar: '',
  toolbar: 'undo redo | bold removeformat image t_image',
  plugins: 'searchreplace autoresize paste t_image t_autofloat',
  content_style:
    '*{line-height:25px;color:#555;font-size:15px;font-family:\'Hiragino Sans GB\',\'Microsoft YaHei\',\'黑体\',Helvetica,Arial,Tahoma,sans-serif;}' +
    'img{max-width:100%;}' +
    'img.size-overflowed{box-sizing:border-box;border:2px solid red;-webkit-filter:opacity(.4);filter:opacity(.4);}' +
    'table{width:100%}',
  extended_valid_elements: 'a[href|target=_blank|title]',
  convert_urls: false,
  paste_as_text: true,
  paste_data_images: true,
  autoresize_min_height: 500,
  autofloat_top_offset: 64,
};

function handleUpload(e, editor) {
  const file = e.data;
  // upload(file).then(data => e.callback(getUrl(data)));
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
