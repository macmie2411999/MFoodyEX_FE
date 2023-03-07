let toggle = (button, targetId) => {
    let element = document.getElementById(targetId);
    let isHidden = element.hidden;
  
    if (isHidden) {
      element.hidden = false;
      button.innerHTML = '<i class="fa fa-angle-up"></i>';
    } else {
      element.hidden = true;
      button.innerHTML = '<i class="fa fa-angle-down"></i>';
    }
  }
  