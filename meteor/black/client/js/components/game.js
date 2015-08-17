/**
 * Created by Patric on 16-8-2015.
 */
var  GAME = GAME || {};

GAME.SplashView = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.width = 1E3;
}

GAME.SplashView.constructor = GAME.SplashView;
GAME.SplashView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.SplashView.prototype.go = function() {
    console.log(22222);
};

GAME.RprView = function(engine) {
    this.engine = engine;
    PIXI.DisplayObjectContainer.call(this);
}

GAME.RprView.constructor = GAME.RprView;
GAME.RprView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.RprView.prototype.go = function() {
    console.log(22222);
};

GAME.RprEngine = function() {
    this.view = new GAME.RprView(this)
}

GAME.RprEngine.constructor = GAME.RprEngine;
GAME.RprEngine.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.RprEngine.prototype.go = function() {
    console.log(22222);
};




