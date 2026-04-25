// MENU MOBILE
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});


// EFEITO DIGITAÇÃO
const typingElement = document.getElementById("typing");
const text = typingElement.getAttribute("data-text");

let index = 0;

function typeEffect() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 80);
  }
}

typeEffect();


// ANIMAÇÃO AO SCROLL
const elements = document.querySelectorAll('.animate');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.8;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', showOnScroll);


// BOTÃO VOLTAR AO TOPO
const btnTopo = document.getElementById("btn-topo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// BOTÃO WHATSAPP
const btnWhats = document.getElementById("btn-whatsapp");

if (btnWhats) {
  btnWhats.addEventListener("click", () => {
    const numero = "5599999999999"; // COLOQUE SEU NÚMERO
    const mensagem = "Olá, tenho interesse em um veículo!";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
  });
}
