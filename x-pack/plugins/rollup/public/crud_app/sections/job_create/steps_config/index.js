/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { validateId } from './validate_id';
import { validateIndexPattern } from './validate_index_pattern';
import { validateRollupIndex } from './validate_rollup_index';
import { validateRollupCron } from './validate_rollup_cron';
import { validateRollupPageSize } from './validate_rollup_page_size';
import { validateDateHistogramField } from './validate_date_histogram_field';
import { validateDateHistogramInterval } from './validate_date_histogram_interval';
import { validateDateHistogramDelay } from './validate_date_histogram_delay';
import { validateHistogramInterval } from './validate_histogram_interval';
import { validateMetrics } from './validate_metrics';

export const STEP_LOGISTICS = 'STEP_LOGISTICS';
export const STEP_DATE_HISTOGRAM = 'STEP_DATE_HISTOGRAM';
export const STEP_TERMS = 'STEP_TERMS';
export const STEP_HISTOGRAM = 'STEP_HISTOGRAM';
export const STEP_METRICS = 'STEP_METRICS';
export const STEP_REVIEW = 'STEP_REVIEW';

export const stepIds = [
  STEP_LOGISTICS,
  STEP_DATE_HISTOGRAM,
  STEP_TERMS,
  STEP_HISTOGRAM,
  STEP_METRICS,
  STEP_REVIEW,
];

export const stepIdToStepConfigMap = {
  [STEP_LOGISTICS]: {
    defaultFields: {
      id: '',
      indexPattern: '',
      rollupIndex: '',
      rollupCron: '',
      rollupPageSize: '',
    },
    fieldsValidator: fields => {
      const {
        id,
        indexPattern,
        rollupIndex,
        rollupCron,
        rollupPageSize,
      } = fields;

      const errors = {
        id: validateId(id),
        indexPattern: validateIndexPattern(indexPattern, rollupIndex),
        rollupIndex: validateRollupIndex(rollupIndex, indexPattern),
        rollupCron: validateRollupCron(rollupCron),
        rollupPageSize: validateRollupPageSize(rollupPageSize),
      };

      return errors;
    },
  },
  [STEP_DATE_HISTOGRAM]: {
    defaultFields: {
      dateHistogramField: null,
      dateHistogramInterval: null,
      dateHistogramDelay: null,
      dateHistogramTimeZone: 'UTC',
    },
    fieldsValidator: fields => {
      const {
        dateHistogramField,
        dateHistogramInterval,
        dateHistogramDelay,
      } = fields;

      const errors = {
        dateHistogramField: validateDateHistogramField(dateHistogramField),
        dateHistogramInterval: validateDateHistogramInterval(dateHistogramInterval),
        dateHistogramDelay: validateDateHistogramDelay(dateHistogramDelay),
      };

      return errors;
    },
  },
  [STEP_TERMS]: {
    defaultFields: {
      terms: [],
    },
  },
  [STEP_HISTOGRAM]: {
    defaultFields: {
      histogram: [],
      histogramInterval: undefined,
    },
    fieldsValidator: fields => {
      const {
        histogram,
        histogramInterval,
      } = fields;

      const errors = {
        histogramInterval: validateHistogramInterval(histogram, histogramInterval),
      };

      return errors;
    },
  },
  [STEP_METRICS]: {
    defaultFields: {
      metrics: [],
    },
    fieldsValidator: fields => {
      const {
        metrics,
      } = fields;

      const errors = {
        metrics: validateMetrics(metrics),
      };

      return errors;
    },
  },
  [STEP_REVIEW]: {},
};