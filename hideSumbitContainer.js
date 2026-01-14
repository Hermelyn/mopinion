<script>
/(function() {
  // Zoek de form actions container
  var formActions = document.querySelector('[data-testid="page_break-group"]');
  
  // Zoek de thumbs radio buttons
  var thumbsPositive = document.getElementById('thumbs-5875_0');
  var thumbsNegative = document.getElementById('thumbs-5875_1');
  
  // Verberg de form actions standaard
  if (formActions) {
    formActions.style.display = 'none';
  }
  
  // Functie om te controleren of een van de thumbs geselecteerd is
  function checkThumbsSelection() {
    if (formActions && (thumbsPositive.checked || thumbsNegative.checked)) {
      formActions.style.display = 'block';
    } else if (formActions) {
      formActions.style.display = 'none';
    }
  }
  
  // Voeg event listeners toe aan beide radio buttons
  if (thumbsPositive) {
    thumbsPositive.addEventListener('change', checkThumbsSelection);
  }
  
  if (thumbsNegative) {
    thumbsNegative.addEventListener('change', checkThumbsSelection);
  }
  
  // Check de initiële state
  checkThumbsSelection();
})();
</script>
