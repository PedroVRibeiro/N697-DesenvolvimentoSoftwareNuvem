document.addEventListener("DOMContentLoaded", function () {
	const openModalBtn = document.getElementById("funcionarios");
	const closeModalBtn = document.getElementById("closeModalButton");
	const modal = document.getElementById("myModal");
	const modalIframe = document.getElementById("modalIframe");

	openModalBtn.addEventListener("click", function () {
		modal.style.display = "block";
		modalIframe.src = "pages/funcionarios/funcionarios.html";
	});

	closeModalBtn.addEventListener("click", function () {
		modal.style.display = "none";
		modalIframe.src = "";
	});
});
