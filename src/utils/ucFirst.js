export default function ucfirst(str) {
    str = str.toLowerCase().replace(/\b\w+\b/g, function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str;
}