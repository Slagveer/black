GAME = GAME || {};

GAME.Scroller = function (stage, image, width, height) {
    this.background = new GAME.Background(image, width, height);
    stage.addChild(this.background);

    this.viewportX = 0;
}

GAME.Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX;
    this.background.setViewportX(viewportX);
};

GAME.Scroller.prototype.getViewportX = function() {
    return this.viewportX;
};

GAME.Scroller.prototype.moveViewportXBy = function(units) {
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};