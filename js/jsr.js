const loadJsr = () => {
    const add = document.querySelector('.add');
    const refresh = document.querySelector('.refresh')
    const ul = document.querySelector('ul');

    xhr("GET", "data/listitems.json", null, function(xhrobj) {
        var items = JSON.parse(xhrobj.responseText);
        items.forEach((item) => addLiElementToList(item));
    });

    const addLiElementToList = (obj) => {

        const li = document.createElement('li')

        const img = document.createElement('img')
        img.src = obj.src

        const h3 = document.createElement('h3')
        h3.textContent = obj.owner;

        const h5 = document.createElement('h5')
        h5.textContent = obj.numOfTags;

        const h4 = document.createElement('h4')
        h4.textContent = obj.added;

        const h2 = document.createElement('h2')
        h2.textContent = obj.title;

        const editButton = document.createElement('button');
        editButton.classList.add('imgbutton', 'edit')
        editButton.textContent = 'edit'

        const playButton = document.createElement('button');
        playButton.classList.add('imgbutton', 'play')
        playButton.textContent = 'play'

        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(h5);
        li.appendChild(h4);
        li.appendChild(h2);
        li.appendChild(playButton)
        li.appendChild(editButton)

        li.onclick = (e) => {
            e.stopPropagation();
            alert(getLiTitle(li))
        }

        editButton.onclick = (e) => {
            e.stopPropagation();
            if (confirm(getLiTitle(li) + '\n' + getLiOwner(li))) {
                li.remove()
            }
        }

        ul.appendChild(li);
    }

    const getLiTitle = (li) => {
        return li.getElementsByTagName("h2")[0].textContent;
    }

    const getLiOwner = (li) => {
        return li.getElementsByTagName("h3")[0].textContent;
    }


    refresh.onclick = () => {
        while (ul.childNodes.length) {
            ul.removeChild(ul.lastChild);
        }

        xhr("GET", "data/listitems.json", null, function(xhrobj) {
            var items = JSON.parse(xhrobj.responseText);
            items.forEach((item) => addLiElementToList(item));
        });
    };

    add.onclick = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        addLiElementToList({
            title: "New Element",
            added: `${day}.${month}.${year}`,
            src: "https://placeimg.com/100/100",
            owner: "user",
            numOfTags: "4",
        });
    };
}

window.addEventListener('load', loadJsr)