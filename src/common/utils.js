// program to convert first letter of a string to uppercase
export function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

export function MoneyFormatter(value) {
    if (isNaN(value)) {
      return '$ 0';
    } else {
      return `$ ${Math.round(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}
  
export function formatDate(fecha) {
  const date = new Date(fecha)
  const formattedDate = date.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })

return formattedDate;
}