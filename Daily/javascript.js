function toggle() {
  const div = document.getElementsByClassName('photo');
    for (var i = 0; i < div.length; i++) {
      if(div[i].style.display === 'none')  {
        div[i].style.display = 'inline-block';
      }else {
        div[i].style.display = 'none';
      }
    }
}