/**
 * Created by Patric on 17-12-2015.
 */
if (typeof(GAME) === 'undefined') {
    this.GAME = {};
}

GAME.Background = function (image, width, height) {
    var texture = PIXI.Texture.fromImage(image);
    PIXI.TilingSprite.call(this, texture, width, height);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

GAME.Background.prototype.constructor = GAME.Background;
GAME.Background.prototype = Object.create(PIXI.TilingSprite.prototype);

GAME.Background.DELTA_X = 0.128;

GAME.Background.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * GAME.Background.DELTA_X);
};

GAME.Background.prototype.getViewportX = function() {
    return this.viewportX;
};