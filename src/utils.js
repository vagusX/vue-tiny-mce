/**
 * @desc Import a built-in theme.
 */
export function requireTheme(name='modern') {
  require(`tinymce/themes/${name}/theme`);
};

/**
 * @desc Import a built-in skin CSS.
 */
export function requireSkin(name='lightgray') {
  require(`tinymce/skins/${name}/skin.min.css`);
};

/**
 * @desc Import content CSS related to given skin name.
 * @return {String}
 */
export function requireContentStyle(name='lightgray') {
  // CSS loader: module.exports = [[module.id, content, sourcemap], ...];
  const css = require(`tinymce/skins/${name}/content.min.css`);
  return css.map((item) => item[1]).join('');
};

/**
 * @desc Generate a unique ID.
 */
export const generateId = function() {
  let id = 0;
  return function () {
    return 'vue-tinymce-' + (++ id);
  };
}();
