export default function useShortName(name) {
    const userName = name?.toLowerCase().split(" ").slice(-2).join("");
    return userName;
}