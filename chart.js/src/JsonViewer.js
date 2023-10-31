export default function JsonViewer({ $app, initialState, handleApply }) {
    this.state = initialState; //items, willAddData, willRemoveData

    this.$target = document.createElement('div');
    this.$target.className = 'JsonViewerContent';
    this.$target.innerHTML = `<h2>4.값 고급 편집</h2>`;
    $app.appendChild(this.$target);

    this.$jsonViewer = document.createElement('div');
    this.$jsonViewer.id = 'json-viewer';
    this.$target.appendChild(this.$jsonViewer);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const jsonString = JSON.stringify(this.state.items, null, 6);

        this.$jsonViewer.innerHTML = `
            <pre> ${jsonString} </pre>
        `;
    };
    this.render();
}
