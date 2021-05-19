<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <title>Dashboard Admin</title>

        <meta charset="utf-8">

        <meta name="description" content="">
        <meta name="author" content="">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <link href="<?php echo DOMINIO_APLICACION . DIRECTORIO_HOJAS_ESTILO . "font-awesome.css"; ?>" rel="stylesheet" type="text/css" />
        <link href="<?php echo DOMINIO_APLICACION . DIRECTORIO_HOJAS_ESTILO . "bootstrap.css"; ?>" rel="stylesheet" type="text/css" />
        <link href="<?php echo DOMINIO_APLICACION . DIRECTORIO_HOJAS_ESTILO . "application.css"; ?>" rel="stylesheet" type="text/css" />
        <link href="<?php echo DOMINIO_APLICACION . DIRECTORIO_HOJAS_ESTILO . "dashboard.css"; ?>" rel="stylesheet" type="text/css" />

    </head>

    <body>

        <div id="wrapper">

            <div id="topbar">

                <div class="container">



                </div> <!-- /.container -->

            </div> <!-- /#topbar -->

            <header id="header">

                <div class="container">



                </div> <!-- /.container -->

            </header> <!-- /#header -->

            <div id="masthead">


            </div> 

            <section id="content">

                <div class="container">

                    <div class="row">

                        <div class="span12">

                            <div class="error-container">

                                <h1>Oops!</h1>

                                <h2><?php echo (isset($heading) ? $heading : ''); ?></h2>

                                <div class="error-details">
                                    <?php echo (isset($message) ? $message : ''); ?>
                                    
                                    <?php  echo ((isset($detalles)) && ($detalles != null)) ? $detalles : ""; ?>
                                    
                                    <br />
                                </div> <!-- /error-details -->

                                <div class="error-actions">
                                    <a href="<?php echo DOMINIO_APLICACION . "dashboard/index"; ?>" class="btn btn-large btn-primary">
                                        <i class="icon-chevron-left"></i>
                                        &nbsp;
                                        Panel de Control					
                                    </a>

                                    <!--                           <a href="./" class="btn btn-large">
                                                                  <i class="icon-envelope"></i>
                                                                  &nbsp;
                                                                  Contact Support						
                                                               </a>-->

                                </div> <!-- /error-actions -->

                            </div> <!-- /.error-container -->				


                        </div> <!-- /.span12 -->

                    </div> <!-- /.row -->

                </div> 

            </section> 

        </div> <!-- /#wrapper -->

        <footer id="footer">

        </footer> 

    </body>
</html>