import JDom from './JDom1.0.js';

const data = [
    {   
        score: 0,
        text: "This is a test",
        total: 10
    },{   
        score: 0,
        text: "This is a test one",
        total: 20
    },{   
        score: 0,
        text: "This is a test two",
        total: 20
    },{   
        score: 0,
        text: "This is a test three",
        total: 10
    }
]

const container = new JDom({
    tag: "div",
    attr: {
        class: "main-container"
    }
}).render("#app");

const btnSave = new JDom({
    tag: "button",
    content: "Save",
    attr: {
        class: "btn-save"
    }
}).render("#app");

btnSave.event("click", () => {
    console.log(data);
});


data.forEach((item, index) => {

    const listItem = new JDom(requireItem(item, index));

    container.add(listItem);

});







function requireItem (item, i) {

    return {
        tag: "div",
        attr: {
            class:"item"
        },
        children: [
            {
                tag: "input",
                attr: {
                    type: "number",
                    value: item.score,
                    class: "score-input",
                    id: `input_${i}`
                },
                events: {
                    change: (e) => {
                        data[i].score = e.target.value;
                    }
                }
            }, {
                tag: "p",
                content: `${item.text} (${item.total})`,
                attr: {
                    class: "item-text"
                }
            }
        ]
        
    }
}