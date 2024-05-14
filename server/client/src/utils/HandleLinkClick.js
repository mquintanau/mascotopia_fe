function handleLinkClick(e, id) {
  e.preventDefault();
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
export default handleLinkClick;
