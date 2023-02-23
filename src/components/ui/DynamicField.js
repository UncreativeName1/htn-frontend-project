import { useState, useEffect } from 'react';

function DynamicField(props) {
    const [fields, setFields] = useState([""]);

    useEffect(() => {
        props.onChange(fields);
    }, [fields, props]);

    function addField() {
        let newField = "";
        setFields([...fields, newField]);
    }

    function removeField(index) {
        let tempData = [...fields];
        tempData.splice(index, 1);
        setFields(tempData);
    }

    function handleChange(event, index) {
        let tempData = [...fields];
        tempData[index] = event.target.value;
        setFields(tempData);
    }
    
    return (
        <div>
            {fields.map((item, key) => {
                return (
                    <div key={key}>
                        <input
                            onChange={(event) => handleChange(event, key)}
                            value={item}
                        />
                        <button onClick={() => removeField(key)}>Remove</button>
                    </div>
                );
            })}
            <button onClick={addField}>Add More</button>
        </div>
    );
}

export default DynamicField;