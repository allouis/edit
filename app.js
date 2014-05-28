var marked = require('marked');

var editMode = 1;
var content = document.body.innerText;

var switchMode = function () {
  console.log('switch mode');
  if (editMode) {
    content = document.body.innerText; 
    marked(content, function (err, res) {
      if (!err) {
        console.log(res);
        document.body.innerHTML = res;
        document.body.contentEditable = 'false';
        document.body.classList.add('output');
        return;
      } else {
        console.err(err);
      }
    });
  } else {
    document.body.innerText = content;
    document.body.contentEditable = 'true';
    document.body.classList.remove('output');
  }
  editMode = !editMode;
};

var cmdDown = false;

var keydown = function (event) {
  if (event.which === 93) {
    cmdDown = true;
  }
  console.log(event.which);
  if (event.which === 13 && cmdDown === true) {
    switchMode();
  }
  console.log(cmdDown);
};

var keyup = function (event) {
  if (event.which === 93) {
    cmdDown = false;
  } 
  console.log(cmdDown);
};

var callbacks = {
  keydown: keydown,
  keyup: keyup
};

['keydown', 'keyup'].forEach(function (ev) {
  document.addEventListener(ev, callbacks[ev]);
});
