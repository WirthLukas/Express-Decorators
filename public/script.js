const onEndpointClicked = (id) => {
    const element = document.getElementById(id);
    
    if (element.classList.contains('hide'))
        element.classList.remove('hide');
    else
        element.classList.add('hide');
}