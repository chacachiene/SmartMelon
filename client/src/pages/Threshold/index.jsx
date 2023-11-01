import React, { useState } from 'react'
import ThresholdForm from 'component/ThresholdForm'
import { publish} from 'database/mqtt'
const Threshold = () => {
    const [showForm, setShowForm] = useState(null);

    const handleButtonClick = (formId) => {
        setShowForm(formId === showForm ? null : formId);
    };
    const handleSubmit = (values) => {
        publish("threshold", values);
    }

    const formObjects = [
        {
            id: 1,
            buttonText: "Soil Moisture",
            formComponent: <ThresholdForm name='mois' type='M' unit='%' onSubmit={handleSubmit}/>,
        },
        {
            id: 2,
            buttonText: "Temperature",
            formComponent: <ThresholdForm />,
        },
        {
            id: 3,
            buttonText: "Humidity",
            formComponent: <ThresholdForm />,
        },
        {
            id: 4,
            buttonText: "Light ",
            formComponent: <ThresholdForm />,
        },
    ];

    return (
        <div>
            <h1>Threshold Page</h1>
            <p>This is the threshold page.</p>
            {formObjects.map((formObject) => (
                <div key={formObject.id}>
                    <button value={formObject.buttonText} onClick={() => handleButtonClick(formObject.id)}>
                        {formObject.buttonText}
                    </button>
                    {showForm === formObject.id && formObject.formComponent}
                </div>
            ))}
        </div>
    );
};


export default Threshold