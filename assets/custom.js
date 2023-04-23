/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

if (window.matchMedia("(max-width: 768px)").matches) {
  	window.onscroll = function() {
      var pageOffset = document.documentElement.scrollTop || document.body.scrollTop,
          btn = document.getElementById('scrollToTop');
      if (btn) btn.style.display = pageOffset > 1200 ? 'block' : 'none';
	}
} 

function toFixed(num, fixed = 2) {
  var regex = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  
  return num.toString().match(regex)[0];
}

function toMoney (num) {
  
  return num.toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ',')
}

function toMoneyy (num) {
  
  return num.toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ',')
}

function parcelamento() {
  var preco = $('.product-form__info-item .price--highlight').text().split('                  ')[0].replace('COL$ ','').replace(',', '.').trim();
  var compare = $('.product-form__info-item .price--compare').text().replace('COL$ ', '').replace(',','.');
  
  var compare = parseFloat(compare);
  var preco = parseFloat(preco);
  
  var precompare = toMoney(compare - preco).replace('.', ',');
  
  precompare = toFixed(precompare);
  
  $('.product-label.product-label--on-sale span').text('COL$ '+ precompare);
  
  var porcent = ((compare - preco) * 100 / compare).toFixed(2).split('.')[0];
  
 $('.price--highlight .product-label.product-label--on-sale').text('-' + porcent + '%'); 
  
  var calculo = ((preco + 0) * 1.0299) / 12;
  var calculo = calculo.toFixed(2).replace('.', ',');
  var calculo = ('COL$ ' + calculo);
  
  $('.parcelamento').html('<span>en hasta 12 cuotas de <b>' + calculo + '</b></span>');
}

$(".block-swatch__radio, .variant-swatch__radio, .block-swatch__item-text, .block-swatch__item, .variant-swatch--disabled, .block-swatch-list, .block-swatch, .product-form__price-info, .block-swatch__item-text").change(function () {
setTimeout(function () { parcelamento(); }, 150);
});


function parcelament() {
   var preco = $('.product-form__info-item .price--highlight ').text().replace(/[^0-9.]/g, '').replace(',', '.').replace(',', '.');

  preco = parseFloat(preco);
  
  var calculo = ((preco + 0));
  
  calculo = ('COL$ ' +toFixed(calculo).replace('.', ','));
  
  $('.parcelament').html('<span>' +  $('.product-form__info-item .price--highlight ').text()+ '</span>');
}



$(".block-swatch__radio, .variant-swatch__radio").change(function () {
  setTimeout(function () { parcelament(); }, 150);
});

var parcelas = [
  { vezes: 1, times: 1.0000 },
  { vezes: 2, times: 1.0764 },
  { vezes: 3, times: 1.0923 },
  { vezes: 4, times: 1.1086 },
  { vezes: 5, times: 1.1231 }, 
  { vezes: 6, times: 1.1365 },
  { vezes: 7, times: 1.1472 },
  { vezes: 8, times: 1.1623 },
  { vezes: 9, times: 1.1769 },
  { vezes: 10, times: 1.1865 },
  { vezes: 11, times: 1.2012 },
  { vezes: 12, times: 1.2161 },
]

function vezes () {
  var preco = $('.product-form__info-item .price--highlight  ').text();
  preco = parseFloat(preco);
  
  function calculo (preco, times, vezes) {
    return ((preco + 0) * times / vezes );
  }
  
  var el_vezes = Array.from($('.vezes'))
  
  parcelas.forEach(function (parcela, position) {
    var calculo_vezes = calculo(preco, parcela.times, parcela.vezes)
    
    calculo_vezes = toFixed(calculo_vezes);
  	calculo_vezes = ('COL$ ' + calculo_vezes);
  
  	$(el_vezes[parcela.vezes - 1]).html('<span>' + calculo_vezes + '</span>');
  })
}


$(".block-swatch__radio, .variant-swatch__radio, .variant-swatch__radio, .block-swatch__item, .variant-swatch__item, .block-swatch__radio:checked, .block-swatch__item-text ").change(function () {
setTimeout(function () { vezes(); }, 150);
});

