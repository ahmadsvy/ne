<div class="content-wrapper bg-gradient-light" style="min-height: 2726.9px;">
    <section class="content-header py-4 bg-white shadow-sm">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-sm-6">
                    <h1 class="display-4 font-weight-black mb-0">
                        <i class="fas fa-cash-register text-primary mr-3"></i>
                        <?php echo lang('pharmacy'); ?> <?php echo lang('sales'); ?>
                    </h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb bg-transparent mb-0">
                            <li class="breadcrumb-item"><a href="home"><?php echo lang('home'); ?></a></li>
                            <li class="breadcrumb-item active"><?php echo lang('pharmacy'); ?> <?php echo lang('sales'); ?></li>
                        </ol>
                    </nav>
                </div>
                <div class="col-sm-6 text-right">
                    <a href="finance/pharmacy/addPaymentView" class="btn btn-primary btn-sm px-4 py-3">
                        <i class="fa fa-plus"></i> <?php echo lang('add_new'); ?>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="content py-5">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="card shadow-lg border-0">
                        <div class="card-header">
                            <h3 class="card-title"><?php echo lang('All the pharmacy sales'); ?></h3>
                        </div>
                        <div class="card-body bg-light p-4">
                            <table class="table table-hover datatables" id="editable-sample1" width="100%">
                                <thead>
                                    <tr class="bg-light">
                                        <th class="font-weight-bold text-uppercase"><?php echo lang('invoice_id'); ?></th>
                                        <th class="font-weight-bold"><?php echo lang('date'); ?></th>
                                        <th class="font-weight-bold"><?php echo lang('sub_total'); ?></th>
                                        <th class="font-weight-bold"><?php echo lang('discount'); ?></th>
                                        <th class="font-weight-bold"><?php echo lang('grand_total'); ?></th>
                                        <th class="font-weight-bold no-print"><?php echo lang('options'); ?></th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>





<script src="common/js/codearistos.min.js"></script>
<script type="text/javascript">
    var language = "<?php echo $this->language; ?>";
</script>

<script src="common/extranal/js/pharmacy/payment.js"></script>