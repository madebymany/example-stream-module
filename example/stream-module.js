require.config({
  baseUrl: "../",
  paths: {
    "jquery": "components/jquery/jquery",
    "bigbird": "components/bigbird/bigbird"
  },
  shim: {
    "bigbird": {
      deps: ["jquery"]
    }
  }
});

require([
  "stream"
],
function(Stream) {

  var stream = new Stream();
  var frequency = 10;

  var dummyItems = [
    {
      title: "Obama accused of nuclear U-turn",
      description: "$10bn plan to update B61 bombs goes against 2010 vow not to deploy new weapons, say critics"
    }, {
      title: "Second arrest over Indian girl's rape",
      description: "Delhi police say five-year-old victim was left for dead in locked room in same building where she lives"
    }, {
      title: "Cartes wins Paraguay election",
      description: "Rightwinger from Colorado party sweeps to popular victory despite stain of corruption scandals"
    }, {
      title: "Liverpool say Suárez's future is safe",
      description: "Liverpool managing director Ian Ayre says the club will not sell Luis Suárez despite biting Chelsea's Branislav Ivanovic"
    }, {
      title: "Call for MPs to sit longer days",
      description: "Margaret Hodge, who chairs the public accounts committee, urges coalition to extend schedule at Westminster"
    }, {
      title: "Deadly earthquake rocks China",
      description: "Sichuan quake leaves 200 people dead or missing, 11,800 injured and an estimated 100,000 homeless"
    }
  ];

  var addToStream = function() {
    setTimeout(function() {
      $.publish("addToStream",
        dummyItems[Math.floor(Math.random() * dummyItems.length)]);
      addToStream();
    }, Math.round(Math.random() * (1000 * frequency)));
  };

  addToStream();

});
