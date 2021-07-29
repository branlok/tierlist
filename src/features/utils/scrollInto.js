export default function scrollInto(prefix, id) {
  let item = document.getElementById(`${prefix}-${id}`);
  if (item) {
    item.scrollIntoView({ behaviour: "smooth", block: "end" });
    item.focus();
  }
}
