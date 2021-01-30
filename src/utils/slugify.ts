function slugify(text, separator) {
  text = text.toString().toLowerCase().trim();
  text = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

  if (typeof separator !== 'undefined' && separator !== '-') {
    text = text.replace(/-/g, separator);
  }

  return text;
}

// const slugify = (str) => {
//   str = str || '';
//   const a =
//     'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;άαβγδεέζήηθιίϊΐκλμνξοόπρσςτυϋύΰφχψωώ';
//   const b =
//     'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------aavgdeeziitiiiiklmnxooprsstyyyyfhpoo';
//   const p = new RegExp(a.split('').join('|'), 'g');

//   return str
//     .toString()
//     .trim()
//     .toLowerCase()
//     .replace(/ου/g, 'ou')
//     .replace(/ευ/g, 'eu')
//     .replace(/θ/g, 'th')
//     .replace(/ψ/g, 'ps')
//     .replace(/\//g, '-')
//     .replace(/\s+/g, '-') // Replace spaces with -
//     .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special chars
//     .replace(/&/g, '-and-') // Replace & with 'and'
//     .replace(/[^\w\-]+/g, '') // Remove all non-word chars
//     .replace(/\-\-+/g, '-') // Replace multiple - with single -
//     .replace(/^-+/, '') // Trim - from start of text
//     .replace(/-+$/, ''); // Trim - from end of text
// };

// const slugify = (text) => {
//   // Use hash map for special characters
//   const specialChars = {
//     à: 'a',
//     ä: 'a',
//     á: 'a',
//     â: 'a',
//     æ: 'a',
//     å: 'a',
//     ë: 'e',
//     è: 'e',
//     é: 'e',
//     ê: 'e',
//     î: 'i',
//     ï: 'i',
//     ì: 'i',
//     í: 'i',
//     ò: 'o',
//     ó: 'o',
//     ö: 'o',
//     ô: 'o',
//     ø: 'o',
//     ù: 'o',
//     ú: 'u',
//     ü: 'u',
//     û: 'u',
//     ñ: 'n',
//     ç: 'c',
//     ß: 's',
//     ÿ: 'y',
//     œ: 'o',
//     ŕ: 'r',
//     ś: 's',
//     ń: 'n',
//     ṕ: 'p',
//     ẃ: 'w',
//     ǵ: 'g',
//     ǹ: 'n',
//     ḿ: 'm',
//     ǘ: 'u',
//     ẍ: 'x',
//     ź: 'z',
//     ḧ: 'h',
//     '·': '-',
//     '/': '-',
//     _: '-',
//     ',': '-',
//     ':': '-',
//     ';': '-',
//   };

//   return text
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, '-') // Replace spaces with -
//     .replace(/./g, (target, _index, _str) => specialChars[target] || target) // Replace special characters using the hash map
//     .replace(/&/g, '-and-') // Replace & with 'and'
//     .replace(/[^\w\-]+/g, '') // Remove all non-word chars
//     .replace(/\-\-+/g, '-') // Replace multiple - with single -
//     .replace(/^-+/, '') // Trim - from start of text
//     .replace(/-+$/, ''); // Trim - from end of text
// };

// function slugify(text) {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
//     .replace(/[\s_-]+/g, '_') // swap any length of whitespace, underscore, hyphen characters with a single _
//     .replace(/^-+|-+$/g, ''); // remove leading, trailing -
// }

export default slugify;
