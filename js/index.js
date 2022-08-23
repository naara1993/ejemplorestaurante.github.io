//modal 

const openModal=document.querySelectorAll('[data-open]');
const closeModal=document.querySelectorAll('[data-close]');
const esVisible= "es-visible";

for (const el of openModal){
   el.addEventListener('click', function(){
    const openM=this.dataset.open;
    document.getElementById(openM).classList.add(esVisible);
   })
}
for (const el of closeModal) {
    el.addEventListener('click', function(){
        this.parentElement.parentElement.classList.remove(esVisible);
    });
}
