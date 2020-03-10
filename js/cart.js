$(function () {
  // 复制多个商品测试
  let iterm = $('.item_list .item_single').eq(0);
  for (let i = 0; i < 15; i++) {
    $('.item_list').append(iterm.clone());
  }
  // 结算条的浮动
  let winHei = $(window).height();            // 屏幕可视区域高度
  let barDis = $('.car_box').height();       // 购物车商品列表高度
  let dis = barDis - winHei;
  let scrol = 0;
  let _dis = 0;
  $(window).bind('scroll', scro);

  function scro () {
    scrol = $(window).scrollTop();
    _dis = dis - scrol;
    fixed();
  }

  function fixed () {
    if (_dis > -60) {                              // 如果商品太多，结算条固定在底部
      $('.cart_footer').addClass('fixed_bottom');
      $('.cart_toolbar').addClass('container');
    } else if (_dis <= -60) {
      $('.cart_footer').removeClass('fixed_bottom');
      $('.cart_toolbar').removeClass('container');
    }
  }

  // 选中要付款的商品，显示付款总额
  let prisAll = parseInt(0);
  let numAll = parseInt(0);
  let check, totdiv, pridiv, numdiv, number, pris, pri;
  $('.check_item').click(function () {               // 选择框点击时
    number = $(this).parents('.item_single').find('.num').text();
    pris = $(this).parents('.item_single').find('.money').text();

    if ($(this).is(':checked')) {                    // 是选中状态， 商品数量、 总金额在原基础上 加
      numAll += parseInt(number);
      prisAll += parseFloat(pris);
    } else {                                        // 是非选中状态，商品数量、 总金额在原基础上 减
      numAll -= parseInt(number);
      prisAll -= parseFloat(pris);
    }
    $('#sp_all').text(numAll);                                       // 已选商品总量
    $('#price_all').text("￥" + prisAll.toFixed(2));     // 最终合计金额
  });
  // 商品数量加减
  $('.SL').click(function () {
    number = $(this).siblings('.num').text();      // 商品数量
    numdiv = $(this).siblings('.num');             // 商品数量对象
    pridiv = $(this).parents('.item_single').find('.price');    				//单价的标签对象
    totdiv = $(this).parents('.item_single').find('.money');				//总价的标签对象
    check = $(this).parents('.item_single').find('.check_item');				//选择框对象
    pri = pridiv.text();      //单价

    //数量减少
    if ($(this).text() === '-') {
      if (number > 1) {
        number--;
        numdiv.text(number);
        pris = pri * number;
        totdiv.text(pris.toFixed(2));										//总价
        if ((check).is(':checked')) {
          prisAll = prisAll - parseFloat(pri);
          numAll = numAll - 1;
          $('#sp_all').text(numAll);
          $('#price_all').text('￥' + prisAll.toFixed(2));
        }
      }

      //数量增加
    } else {
      number++;
      numdiv.text(number);
      pris = pri * number;
      totdiv.text(pris.toFixed(2)); 											//总价

      if ((check).is(':checked')) {
        prisAll += parseFloat(pri); 										//总价
        numAll = numAll + 1;
        $('#sp_all').text(numAll);
        $('#price_all').text('￥' + prisAll.toFixed(2));
      }
    }
  });
  // 删除本条购物
  $(".item_del").click(function () {
    check = $(this).parents(".item_single").find(".check_item");
    number = $(this).parents(".item_single").find(".num").text();
    pris = $(this).parents(".item_single").find(".money");
    pri = pris.text();

    if (check.is(":checked")){                 //删除本条，并从总金额里扣掉被删减商品的金额
      prisAll -= parseFloat(pri);
      numAll -= number;
    }
    $("#sp_all").text(numAll);
    $("#price_all").text("￥" + prisAll.toFixed(2));
    $(this).parents(".item_single").remove();
    barDis = $(".car_box").height();             // 购物车商品列表高度
    dis = barDis - winHei;
    scro();
  });

  // 全选
  $(".check_all").click(function(){
    if($(this).is(':checked')){													//选中全选时
      $(".check_item").each(function(){  										//针对每个选择框
        if(!this.checked){
          $(this).click();
        }

      });
    }else{  																	//取消全选时
      $(".check_item").each(function(){  										//每个选择框去掉选中 ，结算总价为0
        $(this).removeAttr('checked');
        prisAll =0;
        numAll =0;
        $('#sp_all').text(numAll);
        $('#price_all').text('￥' + prisAll.toFixed(2));
      });
    }
  });

  // 删除所选
  $(".del_all").click(function(){
    $(".check_item").each(function(){											//针对每个选择框
      check = $(this).parents(".item-single").find(".check_item");
      pris = $(this).parents(".item-single").find(".money");
      number =  $(this).parents(".item-single").find(".num").text();
      pri = pris.text();              
      if($(this).is(':checked')){												//如果选中框是勾中的则删除，并从总金额里扣掉被删减商品的金额
        prisAll -=  parseFloat(pri);
        numAll  = numAll -number;
        $(this).parents(".item-single").remove();
      }
      $("#sp_all").text(numAll);
      $("#price_all").text("￥" + prisAll.toFixed(2));

    });
    barDis = $(".car-box").height();
    dis = barDis -winHei;
    scro();
  });
})