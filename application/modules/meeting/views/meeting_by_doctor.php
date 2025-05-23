<!--sidebar end-->
<!--main content start-->
<section id="main-content">
    <section class="wrapper site-min-height">
        <!-- page start-->
        <section class="col-md-8">
            <header class="panel-heading">
                <?php echo lang('meetings'); ?>

            </header>

            <div class="col-md-12">
                <header class="panel-heading tab-bg-dark-navy-blueee row">
                    <ul class="nav nav-tabs col-md-8">
                        <li class="active">
                            <a data-toggle="tab" href="#calendardetails"><?php echo lang('meetings'); ?> <?php echo lang('calendar'); ?></a>
                        </li>
                        <li class="">
                            <a data-toggle="tab" href="#list"><?php echo lang('meetings'); ?></a>
                        </li>

                    </ul>

                    <div class="pull-right col-md-4">
                        <div class="pull-right custom_buttonss"></div>
                    </div>

                </header>
            </div>


            <div class="">
                <div class="tab-content">

                    <div id="calendardetails" class="tab-pane active">
                        <div class="">
                            <div class="panel-body">
                                <div class="col-md-12">
                                    <aside class="calendar_ui col-md-12 panel calendar_ui">
                                        <section class="">
                                            <div class="">
                                                <div id="calendarview" class="has-toolbar calendar_view"></div>
                                            </div>
                                        </section>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="list" class="tab-pane ">
                        <div class="">
                            <div class="panel-body">
                                <div class="adv-table editable-table ">
                                    <div class="clearfix">
                                        <button class="export" onclick="javascript:window.print();">Print</button>
                                    </div>
                                    <div class="space15"></div>
                                    <table class="table table-striped table-hover table-bordered" id="editable-sample">
                                        <thead>
                                            <tr>
                                                <th> <?php echo lang('id'); ?></th>
                                                <th> <?php echo lang('patient'); ?></th>
                                                <th> <?php echo lang('date-time'); ?></th>
                                                <th> <?php echo lang('remarks'); ?></th>
                                                <th> <?php echo lang('options'); ?></th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            <?php
                                            foreach ($meetings as $meeting) {
                                                if ($meeting->doctor == $doctor_id) {
                                            ?>
                                                    <tr class="">
                                                        <td><?php echo $meeting->id; ?></td>
                                                        <td> <?php echo $this->db->get_where('patient', array('id' => $meeting->patient))->row()->name; ?></td>
                                                        <td class="center"><?php echo date('d-m-Y', $meeting->date); ?> => <?php echo $meeting->time_slot; ?></td>
                                                        <td>
                                                            <?php echo $meeting->remarks; ?>
                                                        </td>
                                                        <td>
                                                            <!--
                                                        <button type="button" class="btn btn-info btn-xs btn_width editbutton" data-toggle="modal" data-id="<?php echo $meeting->id; ?>"><i class="fa fa-edit"> <?php echo lang('edit'); ?></i></button>   
                                                        -->
                                                            <a class="btn btn-info btn-xs btn_width delete_button" href="meeting/delete?id=<?php echo $meeting->id; ?>&doctor_id=<?php echo $meeting->doctor; ?>" onclick="return confirm('Are you sure you want to delete this item?');"><i class="fa fa-trash"> </i></a>
                                                        </td>
                                                    </tr>
                                            <?php
                                                }
                                            }
                                            ?>




                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </section>
        <!-- page end-->

        <section class="col-md-4">
            <header class="panel-heading">
                <?php echo lang('doctor'); ?>
            </header>


            <section class="">
                <div class="panel-body profile">
                    <a href="#" class="task-thumb">
                        <img src="<?php
                                    if (!empty($mmrdoctor->img_url)) {
                                        echo $mmrdoctor->img_url;
                                    } else {
                                        echo 'uploads/favicon.png';
                                    }
                                    ?>" height="100" width="100">
                    </a>
                    <div class="task-thumb-details">
                        <h1><a href="#"><?php echo $mmrdoctor->name; ?></a></h1>
                        <p><?php echo $mmrdoctor->profile; ?></p>
                    </div>
                </div>
                <table class="table table-hover personal-task">
                    <tbody>
                        <tr>
                            <td>
                                <i class=" fa fa-envelope"></i>
                            </td>
                            <td><?php echo $mmrdoctor->email; ?></td>

                        </tr>
                        <tr>
                            <td>
                                <i class="fa fa-phone"></i>
                            </td>
                            <td><?php echo $mmrdoctor->phone; ?></td>

                        </tr>

                    </tbody>
                </table>
            </section>
        </section>
    </section>
</section>
<!--main content end-->
<!--footer start-->

<!-- Edit Event Modal-->
<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">�</button>
                <h4 class="modal-title font-weight-bold"><i class="fa fa-edit"></i> <?php echo lang('edit_meeting'); ?></h4>
            </div>
            <div class="modal-body">
                <form role="form" id="editMeetingForm" action="meeting/addNew" method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <div class="col-md-3">
                            <label for="exampleInputEmail1"> <?php echo lang('paient'); ?></label>
                        </div>
                        <div class="col-md-9">
                            <select class="form-control form-control-lg m-bot15" id="patientchoose1" name="patient" value=''>

                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-3">
                            <label for="exampleInputEmail1"> <?php echo lang('doctor'); ?></label>
                        </div>
                        <div class="col-md-9">
                            <select class="form-control form-control-lg m-bot15" id="doctorchoose1" name="doctor" value=''>

                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1"> <?php echo lang('date-time'); ?></label>
                        <div data-date="" class="input-group date form_datetime-meridian">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-info date-set"><i class="fa fa-calendar"></i></button>
                                <button type="button" class="btn btn-danger date-reset"><i class="fa fa-times"></i></button>
                            </div>
                            <input type="text" class="form-control form-control-lg" readonly="" name="date" value='' placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1"> <?php echo lang('remarks'); ?></label>
                        <input type="text" class="form-control form-control-lg" name="remarks" value='' placeholder="">
                    </div>



                    <input type="hidden" name="id" value=''>


                    <button type="submit" name="submit" class="btn btn-info"> <?php echo lang('submit'); ?></button>
                </form>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- Edit Event Modal-->
<div class="modal fade" tabindex="-1" role="dialog" id="cmodal">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-weight-bold"><?php echo lang('patient') . " " . lang('history'); ?></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id='medical_history'>
                <div class="col-md-12">

                </div>
            </div>
            <div class="modal-footer">
                <div class="col-md-12">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="common/js/codearistos.min.js"></script>
<script type="text/javascript">
    var select_doctor = "<?php echo lang('select_doctor'); ?>";
</script>
<script type="text/javascript">
    var select_patient = "<?php echo lang('select_patient'); ?>";
</script>
<script type="text/javascript">
    var language = "<?php echo $this->language; ?>";
</script>
<script type="text/javascript">
    var doctor_id = "<?php echo $doctor_id; ?>";
</script>
<script src="common/extranal/js/meeting/meeting_by_doctor.js"></script>
</body>