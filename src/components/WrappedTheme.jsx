import { useTheme } from "../context/ThemeContext";

export default function WrappedTheme({children}) {
    const {theme} = useTheme();
    return <div className={theme}>{children}</div>
}