export default {
  param: function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
      .exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }
}