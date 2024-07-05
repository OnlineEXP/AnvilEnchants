let roi = new Map([
    ["I", 1],
    ["II", 2],
    ["III", 4],
    ["IV", 8],
    ["V", 16],
    ["VI", 32],
    ["VII", 64],
    ["VIII", 128],
    ["IX", 256],
    ["X", 512],
]);

let max = new Map([
    ["Rejuvenate", 16],
    ["Legion", 16],
    ["Wisdom", 16],
    ["Dedication", 4],
    ["Last Stand", 16],
    ["Ultimate Wise", 16],
    ["Soul Eater", 16],
    ["Swarm", 16],
    ["Chimera", 16],
    ["Overload", 16],
    ["Quantum", 16],
    ["Strong Mana", 512],
    ["Ferocious Mana", 512],
    ["Hardened Mana", 512],
    ["Mana Vampire", 512],
]);

function eName(name) {
    let namearr = name.split(" ");
    let rnl = namearr[namearr.length - 1].length;
    return name.substring(0, name.length - rnl - 1);
}

function eNumber(name) {
    let namearr = name.split(" ");
    return namearr[namearr.length - 1];
}

let highlights = [];

register("guiClosed", () => {
    highlights = [];
});

register("renderSlot", (slot) => {
    let x = slot.getDisplayX();
    let y = slot.getDisplayY();
    let slotIndex = slot.getIndex();
    for (let i = 0; i < highlights.length; i++) {
        if (highlights[i] == slotIndex) {
            Renderer.drawRect(Renderer.GREEN, x, y, 16, 16);
        }
    }
});

register("step", (slot) => {
    let inv = Player.getContainer();
    if (inv.getName() == "Anvil") {
        let invitems = inv.getItems();
        highlights = [];
        let done = false;
        for (let i = 0; i < invitems.length; i++) {
            if (invitems[i] === null) continue;
            if (!invitems[i].getName().includes("Enchanted Book")) continue;
            if (invitems[i].getLore().length < 2) continue;
            let lore1 = invitems[i].getLore()[1].removeFormatting();
            let name = eName(lore1);
            let count = roi.get(eNumber(lore1));
            if (!max.has(name)) continue;
            if (max.get(name) <= count) continue;
            for (let j = i + 1; j < invitems.length; j++) {
                if (invitems[j] === null) continue;
                if (!invitems[j].getName().includes("Enchanted Book")) continue;
                if (lore1 === invitems[j].getLore()[1].removeFormatting()) {
                    if (!done) highlights.push(i);
                    highlights.push(j);
                    done = true;
                }
            }
            if (done) break;
        }
    }
}).setFps(20);
