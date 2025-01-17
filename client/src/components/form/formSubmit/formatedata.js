export function processFormData(formData) {
    let updatedData = [...formData];
    
    for (let i = 0; i < updatedData.length; i++) {
        if (updatedData[i].html_type === "label") {
            let labelLastWord = updatedData[i].value.split(" ").pop().toLowerCase();
            
            // Find all buttons after the label
            let j = i + 1;
            while (j < updatedData.length && updatedData[j].html_type === "button") {
                updatedData[j]["store_as"] = labelLastWord;
                j++;
            }
        }
    }
    
    return updatedData;
}