document.addEventListener('DOMContentLoaded', function() {
  function revealTimelineItems() {
    var items = document.querySelectorAll('.timeline-item');
    var windowHeight = window.innerHeight;
    items.forEach(function(item) {
      var rect = item.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        item.classList.add('visible');
      }
    });
  }
  revealTimelineItems();
  window.addEventListener('scroll', revealTimelineItems);
});
