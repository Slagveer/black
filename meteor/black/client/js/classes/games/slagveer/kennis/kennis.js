/**
 * Created by Patric on 20-8-2015.
 */
GAME = {};

GAME.Kennis = function(width, height, xStart, yStart) {
    var filter = new PIXI.filters.ColorMatrixFilter();
    var self = this;
    var shadow = new PIXI.filters.DropShadowFilter();
    var style = null;
    var style2 = null;

    PIXI.Container.call(self);
    shadow.color = 0x111111;
    shadow.distance = 5;
    shadow.alpha = 0.55;
    shadow.angle = Math.PI*0.25;
    shadow.blurXFilter.blurX = 32;
    shadow.blurXFilter.blurY = 16;
    shadow.blurXFilter.passes = 2;
    shadow.blurYTintFilter.passes = 5;
    self.background = new PIXI.Graphics();
    self.background.lineStyle(2, 0xffffff, 1);
    self.background.beginFill(0xffffff);
    self.background.drawRoundedRect(xStart, yStart, width, height, 40);
    self.background.endFill();
    self.background.dropShadow = true;
    self.background.filters = [shadow];
    self.background.shadowColor = '#00ff00';
    self.background.shadowBlur = 40;
    self.background.shadowOffsetX = 0;
    self.background.shadowOffsetY = 0;
    self.descriptionBackground = new PIXI.Graphics();
    self.descriptionBackground.lineStyle(2, 0xffffff, 1);
    self.descriptionBackground.beginFill(0x000000);
    self.descriptionBackground.drawRoundedRect(100, 350, width, height, 40);
    self.descriptionBackground.endFill();
    self.descriptionBackground.dropShadow = true;
    self.descriptionBackground.filters = [shadow];
    self.descriptionBackground.shadowColor = '#00ff00';
    self.descriptionBackground.shadowBlur = 40;
    self.descriptionBackground.shadowOffsetX = 0;
    self.descriptionBackground.shadowOffsetY = 0;
    self.addChild(self.background);
    self.addChild(self.descriptionBackground);
}

GAME.Kennis.prototype.constructor = GAME.Kennis;
GAME.Kennis.prototype = Object.create(PIXI.Container.prototype);
GAME.Kennis.prototype.setTitle =  function(title) {
    var self = this;

     WebFont.load({
        google: {
            families: ['Open+Sans:400,800', 'Droid Serif']
        },
        active: function() {
            style = {
                font : 'Bold 50px Open Sans',
                fill : '#000000',
                wordWrap : true,
                wordWrapWidth : self.background.width
            };
            if(typeof self.title === 'undefined') {
                self.title = new PIXI.Text(title, style);
                self.title.x = self.background._bounds.x + self.background.width / 2 + 30;
                self.title.y = self.background._bounds.y + self.background.height / 2;
                self.title.anchor.set(0.5);
                self.addChild(self.title);
            } else {
                self.title._text = title;
            }
        }
    });
};
GAME.Kennis.prototype.setDescription =  function(description) {
    var self = this;

     WebFont.load({
        google: {
            families: ['Open+Sans:400,800', 'Droid Serif']
        },
        active: function() {
            style = {
                font : 'Bold 50px Open Sans',
                fill : '#ffffff',
                wordWrap : true,
                wordWrapWidth : self.background.width
            };
            if(typeof self.description === 'undefined') {
                self.description = new PIXI.Text(description, style);
                self.description.x = self.descriptionBackground._bounds.x + self.descriptionBackground.width / 2 + 30;
                self.description.y = self.descriptionBackground._bounds.y + self.descriptionBackground.height / 2;
                self.description.anchor.set(0.5);
                self.addChild(self.description);
            } else {
                self.description._text = title;
            }
        }
    });
};
GAME.Kennis.prototype.setWidth =  function(width) {
    self.background._bounds.width = width;
};
GAME.Kennis.prototype.setHeight =  function(height) {
    self.background._bounds.height = height;
};