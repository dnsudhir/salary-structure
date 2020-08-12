document.addEventListener("DOMContentLoaded", function () {
    new Vue({
        el: '#app',
        data: {
            ctc: 0,
            monthly: 0,
            newSal: {
                basic: {
                    label: 'Basic',
                    val: 0
                },
                hra: {
                    label: 'HRA',
                    val: 0
                },
                tr: {
                    label: 'Telephone Reimbursement',
                    val: 0
                },
                cea: {
                    label: 'Children Education Allowance',
                    val: 200
                },
                sa: {
                    label: 'Special Allowance',
                    val: 0
                },
                lta: {
                    label: 'Leave Travel Allowance',
                    val: 0
                },
                grossPay: {
                    label: 'Gross Pay',
                    val: 0
                },
                employeePf: {
                    label: 'Employee PF Contribution',
                    val: 0
                },
                employeeEsi: {
                    label: 'Employee ESI Contribution',
                    val: 0
                },
                professionalTax: {
                    label: 'Professional Tax',
                    val: 200
                },
                netPay: {
                    label: 'Net Pay',
                    val: 0
                },
                employerPf: {
                    label: 'Employer PF Contribution',
                    val: 0
                },
                employerEsi: {
                    label: 'Employer ESI Contribution',
                    val: 0
                },
                gratuity: {
                    label: 'Gratuity',
                    val: 0
                },
                total: {
                    label: 'Total',
                    val: 0
                }
            },
            oldSal: {
                basic: {
                    label: 'Basic',
                    val: 0
                },
                hra: {
                    label: 'HRA',
                    val: 0
                },
                ca: {
                    label: 'Conveyance Allowance',
                    val: 0
                },
                mr: {
                    label: 'Medical Reimbursement',
                    val: 1250
                },
                sa: {
                    label: 'Special Allowance',
                    val: 0
                },
                grossPay: {
                    label: 'Gross Pay',
                    val: 0
                },
                employeePf: {
                    label: 'Employee PF Contribution',
                    val: 0
                },
                employeeEsi: {
                    label: 'Employee ESI Contribution',
                    val: 0
                },
                professionalTax: {
                    label: 'Professional Tax',
                    val: 200
                },
                netPay: {
                    label: 'Net Pay',
                    val: 0
                },
                employerPf: {
                    label: 'Employer PF Contribution',
                    val: 0
                },
                employerEsi: {
                    label: 'Employer ESI Contribution',
                    val: 0
                },
                gratuity: {
                    label: 'Gratuity',
                    val: 0
                },
                total: {
                    label: 'Total',
                    val: 0
                }
            },
        },
        methods: {
            calculateNew: function () {
                // Basic Pay
                this.newSal.basic.val = (this.ctc / 12) * (50 / 100);
                // HRA
                this.newSal.hra.val = this.newSal.basic.val * (50 / 100);
                // Telephone Reimbursement
                this.newSal.tr.val = this.ctc > 650000 ? 1000 : 0;
                //Special Allowance
                this.newSal.sa.val = 3504;
                // Leave Travel Allowance
                this.newSal.lta.val = this.ctc > 650000 ? this.newSal.basic.val * (10 / 100) : 0;

                // Gross Pay
                this.newSal.grossPay.val =
                    this.newSal.basic.val +
                    this.newSal.hra.val +
                    this.newSal.tr.val +
                    this.newSal.cea.val +
                    this.newSal.sa.val +
                    this.newSal.lta.val;

                    //Employee PF
                if (this.newSal.basic.val > 15000) {
                    this.newSal.employeePf.val = this.newSal.basic.val * (12 / 100);
                } else {
                    const sum =
                        this.newSal.basic.val +
                        this.newSal.tr.val +
                        this.newSal.cea.val +
                        this.newSal.sa.val +
                        this.newSal.lta.val;
                    this.newSal.employeePf.val = sum * (12 / 100);
                }

                // Employer PF
                this.newSal.employerPf.val = this.newSal.employeePf.val;
                // Gratuity
                this.newSal.gratuity.val =
                this.newSal.basic.val * (4.81 / 100);

                // Employee ESI
                this.newSal.employeeEsi.val =
                    this.newSal.grossPay.val > 21000 ?
                    0 :
                    this.newSal.grossPay.val * (0.75 / 100);

                    // Professional Tax
                if (this.newSal.grossPay.val > 15000) {
                    if (this.newSal.grossPay > 20000) {
                        this.newSal.professionalTax.val = 200;
                    } else {
                        this.newSal.professionalTax.val = 150;
                    }
                } else {
                    this.newSal.professionalTax.val = 0;
                }

                // Net Pay
                this.newSal.netPay.val = this.newSal.grossPay.val - this.newSal.employeePf.val - this.newSal.employeeEsi.val - this.newSal.professionalTax.val;

                
                // Employer ESI
                this.newSal.employerEsi.val = this.newSal.grossPay.val > 21000 ? 0 : this.newSal.grossPay.val * (3.25 / 100);

                
                // Total
                this.newSal.total.val = this.newSal.grossPay.val +
                    this.newSal.employeePf.val +
                    this.newSal.employerEsi.val +
                    this.newSal.gratuity.val;

                this.newSal.sa.val = this.newSal.sa.val + this.monthly - this.newSal.total.val;
                // End of Code
                this.repetitiveCodeForNew();

            },
            calculateOld: function () {
                this.oldSal.basic.val = this.ctc / 12 * (40 / 100);
                this.oldSal.hra.val = this.oldSal.basic.val * (40 / 100);
                this.oldSal.ca.val = this.oldSal.hra.val * 0.25;
                this.oldSal.sa.val = 7069;

                this.oldSal.grossPay.val =
                    this.oldSal.basic.val +
                    this.oldSal.hra.val +
                    this.oldSal.ca.val +
                    this.oldSal.mr.val +
                    this.oldSal.sa.val;

                this.oldSal.employeePf.val = this.oldSal.basic.val * (12 / 100);

                this.oldSal.employeeEsi.val = this.oldSal.grossPay.val > 21000 ? 0 :
                    this.oldSal.grossPay.val * (0.75 / 100);
                this.oldSal.professionalTax.val =
                    this.oldSal.grossPay.val > 15000 ? 200 : 0;

                this.oldSal.netPay.val =
                    this.oldSal.grossPay.val -
                    this.oldSal.employeePf.val -
                    this.oldSal.employeeEsi.val -
                    this.oldSal.professionalTax.val;

                this.oldSal.employerPf.val = this.oldSal.employeePf.val;

                this.oldSal.employerEsi.val = this.oldSal.grossPay.val > 21000 ? 0 :
                    this.oldSal.grossPay.val * (3.25 / 100);

                this.oldSal.gratuity.val = this.oldSal.basic.val * (4.81 / 100);

                this.oldSal.total.val = this.oldSal.grossPay.val +
                    this.oldSal.employeePf.val +
                    this.oldSal.employerEsi.val +
                    this.oldSal.gratuity.val;

                this.oldSal.sa.val = this.oldSal.sa.val + this.monthly - this.oldSal.total.val;
                // End of Code
                this.repetitiveCodeForOld();

            },
            repetitiveCodeForNew: function () {
                // Gross Pay
                this.newSal.grossPay.val =
                    this.newSal.basic.val +
                    this.newSal.hra.val +
                    this.newSal.tr.val +
                    this.newSal.cea.val +
                    this.newSal.sa.val +
                    this.newSal.lta.val;

                // Employee ESI
                this.newSal.employeeEsi.val =
                    this.newSal.grossPay.val > 21000 ?
                    0 :
                    this.newSal.grossPay.val * (0.75 / 100);

                    // Professional Tax
                if (this.newSal.grossPay.val > 15000) {
                    if (this.newSal.grossPay > 20000) {
                        this.newSal.professionalTax.val = 200;
                    } else {
                        this.newSal.professionalTax.val = 150;
                    }
                } else {
                    this.newSal.professionalTax.val = 0;
                }

                // Net Pay
                this.newSal.netPay.val = this.newSal.grossPay.val - this.newSal.employeePf.val - this.newSal.employeeEsi.val - this.newSal.professionalTax.val;

                // Employer ESI
                this.newSal.employerEsi.val = this.newSal.grossPay.val > 21000 ? 0 : this.newSal.grossPay.val * (3.25 / 100);

                // Total
                this.newSal.total.val = this.newSal.grossPay.val +
                    this.newSal.employeePf.val +
                    this.newSal.employerEsi.val +
                    this.newSal.gratuity.val;

            },
            repetitiveCodeForOld: function () {
                this.oldSal.grossPay.val =
                    this.oldSal.basic.val +
                    this.oldSal.hra.val +
                    this.oldSal.ca.val +
                    this.oldSal.mr.val +
                    this.oldSal.sa.val;

                this.oldSal.employeeEsi.val = this.oldSal.grossPay.val > 21000 ? 0 :
                    this.oldSal.grossPay.val * (0.75 / 100);
                this.oldSal.professionalTax.val =
                    this.oldSal.grossPay.val > 15000 ? 200 : 0;

                this.oldSal.netPay.val =
                    this.oldSal.grossPay.val -
                    this.oldSal.employeePf.val -
                    this.oldSal.employeeEsi.val -
                    this.oldSal.professionalTax.val;

                this.oldSal.employerEsi.val = this.oldSal.grossPay.val > 21000 ? 0 :
                    this.oldSal.grossPay.val * (3.25 / 100);

                this.oldSal.total.val = this.oldSal.grossPay.val +
                    this.oldSal.employeePf.val +
                    this.oldSal.employerEsi.val +
                    this.oldSal.gratuity.val;
            }
        },
        watch: {
            ctc: function () {
                this.monthly = this.ctc / 12;
                this.calculateNew();
                this.calculateOld();
            },
        },
        filters: {
            round: function (val) {
                val = Math.round(val * Math.pow(10, 2)) / Math.pow(10, 2);
                return val;
            }
        }
    })
});