function eventEmitter(target, className, callback) {
  target.addEventListener('click', function (e) {
    var current_node = e.target;
    while (current_node.getAttribute('class') === className) {
      current_node = current_node.parentNode;
    }
    callback(current_node);
  }, false);
}

eventEmitter(document, 'nav-btn', function (target) {
  changeTab(target);
})