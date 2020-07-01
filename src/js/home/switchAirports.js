import {
    vInputFrom,
    vInputTo,
    objUserSelections
} from './index.js';

export default function switchAirpots() {
    let vInputVaue1 = vInputFrom.value;
    let vInputVaue2 = vInputTo.value;
    vInputFrom.value = vInputVaue2;
    vInputTo.value = vInputVaue1;
    objUserSelections.connections.fromAirport = vInputVaue2;
    objUserSelections.connections.toAirport = vInputVaue1;
}