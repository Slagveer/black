/**
 * Created by Patric on 20-8-2015.
 */
if (typeof(GAME) === 'undefined') {
    this.GAME = {};
}

GAME.Navigation = function(image, imageOver, xStart, yStart) {
    var self = this;

    PIXI.Container.call(self);
    self.buttonMode = true;
    self.interactive = true;
    self.imageTexture =  PIXI.Texture.fromImage(image);
    self.imageOverTexture =  PIXI.Texture.fromImage(imageOver);
    self.fist = new PIXI.Sprite.fromImage(image);
    self.fist.anchor.set(0.5);
    self.fist.position.x = xStart;
    self.fist.position.y = yStart;
    self.fist.texture = self.imageTexture;
    self.fist.scale.x = .7;
    self.fist.scale.y = .7;
    self.fist.buttonMode = true;
    self.fist.interactive = true;
    self.fist.mouseover = mouseOver;
    self.fist.mouseout = mouseOut;
    self.fist.mousedown = mouseDown;
    self.fist.mouseup = mouseUp;

    self.addChild(self.fist);

    function mouseDown() {
        self.fist.texture = self.imageOverTexture;
    }

    function mouseUp() {
        self.fist.texture = self.imageTexture;
    }

    function mouseOver() {
        new TWEEN.Tween(self.fist.scale)
            .to({
                x: 0.8,
                y: 0.8
            }, 200)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();
    }

    function mouseOut() {
        new TWEEN.Tween(self.fist.scale)
            .to({
                x: 0.7,
                y: 0.7
            }, 200)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();
    }
}

GAME.Navigation.prototype.constructor = GAME.Navigation;
GAME.Navigation.prototype = Object.create(PIXI.Container.prototype);
GAME.Navigation.prototype.setWidth =  function(width) {
    self.fist._bounds.width = width;
};
GAME.Navigation.prototype.setHeight =  function(height) {
    self.fist._bounds.height = height;
};