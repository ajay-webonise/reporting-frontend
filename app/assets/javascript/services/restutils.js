import $ from 'jquery'

function ajax(options) {
  return new Promise(function (resolve, reject) {
    $.ajax(options).done(resolve).fail(reject);
  });
}

module.exports = {
  ajax
};