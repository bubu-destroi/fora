import { createContext , useState} from "react";

const ThemeContext = createContext()

const ThemeProviderWrapper = props =>{ //can deconstruct the props eg: {{children}} and then return just {children}

    const [theme, setTheme] = useState('light')

    const toggleTheme = () =>{
        if (theme === 'light'){
            setTheme('dark')
        }else{
            setTheme('light')
        }

        //ternary theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme }} >
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeProviderWrapper}