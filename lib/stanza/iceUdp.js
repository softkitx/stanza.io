var stanza = require('jxt');
var jingle = require('./jingle');


var NS = 'urn:xmpp:jingle:transports:ice-udp:1';


exports.ICEUDP = stanza.define({
    name: '_iceUdp',
    namespace: NS,
    element: 'transport',
    fields: {
        transType: {value: 'iceUdp'},
        pwd: stanza.attribute('pwd'),
        ufrag: stanza.attribute('ufrag')
    }
});


exports.RemoteCandidate = stanza.define({
    name: 'remoteCandidate',
    namespace: NS,
    element: 'remote-candidate',
    fields: {
        component: stanza.attribute('component'),
        ip: stanza.attribute('ip'),
        port: stanza.attribute('port')
    }
});


exports.Candidate = stanza.define({
    name: '_iceUdpCandidate',
    namespace: NS,
    element: 'candidate',
    fields: {
        component: stanza.attribute('component'),
        foundation: stanza.attribute('foundation'),
        generation: stanza.attribute('generation'),
        id: stanza.attribute('id'),
        ip: stanza.attribute('ip'),
        network: stanza.attribute('network'),
        port: stanza.attribute('port'),
        priority: stanza.attribute('priority'),
        protocol: stanza.attribute('protocol'),
        relAddr: stanza.attribute('rel-addr'),
        relPort: stanza.attribute('rel-port'),
        type: stanza.attribute('type')
    }
});


exports.Fingerprint = stanza.define({
    name: '_iceFingerprint',
    namespace: 'urn:xmpp:tmp:jingle:apps:dtls:0',
    element: 'fingerprint',
    fields: {
        hash: stanza.attribute('hash'),
        value: stanza.text(),
        required: stanza.boolAttribute('required')
    }
});


stanza.extend(jingle.Content, exports.ICEUDP);
stanza.extend(exports.ICEUDP, exports.Candidate, 'candidates');
stanza.extend(exports.ICEUDP, exports.RemoteCandidate);
stanza.extend(exports.ICEUDP, exports.Fingerprint, 'fingerprints');
