import React, {useState} from "react";
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

export const CodeEditor = () => {

    const [code, setCode] = useState(
        `const add = (a, b) => {\n  return a + b;\n}`
    );
    const [language, setLanguage] = useState('JavaScript');

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };
    return (
        <>
            <FormControl classes={{
                minWidth: 120
            }}>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={language}
                    onChange={handleChange}
                    autoWidth={true}
                >
                    <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
                    <MenuItem value={"Python"}>Python</MenuItem>
                    <MenuItem value={"Java"}>Java</MenuItem>
                </Select>
            </FormControl>
            <InputLabel id="simple-select-label">Language</InputLabel>
            <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={20}
            minLength={200}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12
            }}
        />
        </>

    );
}
