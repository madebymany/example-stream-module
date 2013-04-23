require([
  "stream"
],
function(Stream) {

  describe("Stream", function() {

    var addToStream = function() {
      $.publish("addToStream", dummyItem);
    };

    var dummyItem = {
      title: "Obama accused of nuclear U-turn",
      description: "$10bn plan to update B61 bombs goes against 2010 vow not to deploy new weapons, say critics"
    };

    var stream;

    beforeEach(function() {
      stream = new Stream({
        el: $("<div />")
      });
    });

    describe(".onItemReceive", function() {
      it("to increment the number of new items in the stream", function() {
        expect(stream.newItemsInStream).toEqual(0);
        addToStream();
        expect(stream.newItemsInStream).toEqual(1);
      });

      it("should call .createStreamItem", function() {
        spyOn(stream, "createStreamItem");
        addToStream();
        expect(stream.createStreamItem).toHaveBeenCalled();
      });
    });

    describe(".createStreamItem", function() {
      it("to parse and insert HTML with the given data", function() {
        addToStream();
        var html = stream.$el.html();

        expect(html).toContain(dummyItem.title);
        expect(html).toContain(dummyItem.description);
      });

      it("can add a number of items", function() {
        var num = 5;
        var i = num;
        var spy = spyOn(stream, "createStreamItem").andCallThrough();

        while (i--) {
          addToStream();
        }

        expect(spy.callCount).toEqual(num);
        expect(stream.$(".stream__item").length).toEqual(num);
      });

      it("to make a new item visible after insertion", function() {
        var hasHiddenClass = function() {
          return stream.$(".stream__item").hasClass("is-hidden");
        };

        addToStream();

        waitsFor(function() {
          return !hasHiddenClass();
        });

        runs(function() {
          expect(hasHiddenClass()).toBeFalsy();
        });
      });
    });

  });

});
