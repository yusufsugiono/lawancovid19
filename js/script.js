/*animasi opening jumbotron*/
$(window).on('load',function(){
    $('.jumbotron img').addClass('muncul');
    $('.jumbotron h1').addClass('muncul');
    $('.jumbotron p').addClass('muncul');
  });

  /*smooth-scroll*/
  $('.nav-link').on('click', function(e){
    var tujuan = $(this).attr('href');
    var elemenTujuan = $(tujuan);

    $('body').animate({
      scrollTop: elemenTujuan.offset().top
    }, 1000, 'swing');

  });

  /*animasi halaman saat scroll*/
  $(window).scroll(function(){
    var wScroll = $(this).scrollTop();

    /*section penularan*/
    if (wScroll > $('#penularan').offset().top - 275){
      $('#penularan .judulnya').addClass('muncul');
      $('#penularan .kontennya').each( function(i) {
        setTimeout(function() {
          $('.kontennya').eq(i).addClass('muncul');
        }, 300 * (i+1));              
      });

    }

    /*section pencegahan*/
    if (wScroll > $('#pencegahan').offset().top - 325){
      $('#pencegahan .judulnya').addClass('muncul');
      $('#pencegahan .card').each( function(i) {
        setTimeout(function() {
          $('.card').eq(i).addClass('muncul');
        }, 300 * (i+1));              
      });

    }

    /*section tes diri*/
    if (wScroll > $('#tesdiri').offset().top - 375) {
      $('#tesdiri h2').addClass('muncul');
    }

    if (wScroll > $('#tesdiri').offset().top - 250){
      $('#tesdiri .card').addClass('muncul');
    }

  });

  /*penanganan soal*/
  $('document').ready(function(){

    /*menyembunyikan pernyataan di awal*/
    for (var i = 1; i <=21 ; i++) {
      $('.soal'+i).hide();
    }

    /*menyembunyikan hasil di awal*/
    $('h5').hide();


    /*menyembunyikan tombol ya, tidak, dan ulangi di awal*/
    $('.ya').hide();
    $('.tdk').hide();
    $('.ulangi').hide();

    /*saat tombol mulai diklik dan muncul soal1*/
    $('.mulai').click(function() {
      $(this).fadeOut(500);
      $('h4, .pembuka').fadeOut(500);
      $('.ya, .tdk, .soal1').delay(500).fadeIn(500);
      sampaiMana(totalKlik);
      setTimeout(function(){
        $('#tesdiri .card-body').addClass('align-items-center d-flex justify-content-center');
      }, 500);
    });
  });


  var totalKlik = 1;
  var totalYa   = 0;

  /*saat tombol 'ya' diklik*/
  $('.ya').click(function() {
    totalYa += 1;
    totalKlik += 1;
    sampaiMana(totalKlik);
  });

  /*saat tombol 'tidak' diklik*/
  $('.tdk').click(function() {
    totalKlik += 1;
    sampaiMana(totalKlik);
  });


  function lanjut(totalKlik,totalYa){
    var keluar    = '.soal'+(totalKlik);
    var masuk     = '.soal'+(totalKlik+1);
    /*memanggil soal secara bergiliran*/
    if(totalKlik<21){
      $(keluar).hide();
      $(masuk).delay(100).show();
    }else{
      $(keluar).fadeOut(500);
      $('.ya, .tdk').fadeOut(500);
      $('.ulangi').delay(500).fadeIn(500);
      if (totalYa<=7) {
        $('h5').html('Anda BERISIKO RENDAH tertular Covid-19');
      }else if (totalYa<=14){
        $('h5').html('Anda <span class="text-warning">BERISIKO SEDANG</span> tertular Covid-19');
      }else{
        $('h5').html('Anda <span class="text-danger">BERISIKO TINGGI</span> tertular Covid-19');            
      }
      $('h5').delay(500).fadeIn(500);
    }
  };

  if(totalKlik==22){
  }

  /*fungsi untuk progresbar dinamis*/
  function sampaiMana(totalKlik){

    if(totalKlik<22){
      $('#proses').text(totalKlik + ' / 21 Pernyataan');
      var panjang = eval((totalKlik-1) / 21 * 100);
      var persentase = panjang + '%';
      $('.progress-bar').css('width', persentase );
    }else if(totalKlik==22){
      $('#proses').text('Selesai');
      $('.progress-bar').css('width', '100%' );
    }
  }

  /*saat tombol 'ulangi' ditekan*/
  $('.ulangi').click(function(){
    $('h5').fadeOut(500);
    $(this).fadeOut(500);
    setTimeout(function(){
        $('#tesdiri .card-body').removeClass('align-items-center d-flex justify-content-center');
      }, 500);
    setTimeout(function(){
        $('.progress-bar').css('width', '0%' );
        $('#proses').text('0 / 21 Pernyataan');
        $('h4, .pembuka, .mulai').delay(500).fadeIn(500);
      }, 300);

    /*reset*/
    totalKlik = 1;
    totalYa   = 0;
    
  });
