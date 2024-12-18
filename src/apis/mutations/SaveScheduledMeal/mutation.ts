import { gql } from "@apollo/client";

const SET_SCHEDULE_MEAL = gql`
  mutation Mutation($params: ScheduleMealParams!) {
    scheduleMeal(params: $params) {
      ... on ScheduleMealSuccess {
        mealId
      }
      ... on ScheduleMealFailure {
        message
      }
    }
  }
`;
export default SET_SCHEDULE_MEAL;
