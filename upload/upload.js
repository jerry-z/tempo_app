function uploadPhoto(){

    let file = document.getElementById('file-input').files[0];
    let file_name = file.name;
    let file_type = file.type;
    let reader = new FileReader();

    reader.onload = function() {
        let arrayBuffer = this.result;
        let blob = new Blob([new Int8Array(arrayBuffer)], {
            type: file_type
        });
        let blobUrl = URL.createObjectURL(blob);

        console.log(blob);

        let data = document.getElementById('file-input').files[0];
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });
        xhr.withCredentials = false;
        xhr.open("PUT", "https://music-temp.s3.amazonaws.com/"+'tmp.jpg');
        console.log(data.name)
        xhr.setRequestHeader("Content-Type", data.type);
        xhr.send(data);
    };
    reader.readAsArrayBuffer(file);

}