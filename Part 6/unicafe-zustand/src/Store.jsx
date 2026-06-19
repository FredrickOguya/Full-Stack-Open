import { create } from 'zustand';

const usefeedbackStore = create(set => ({
    good : 0,
    neutral : 0,
    bad : 0,
    actions: {
      handleGoodClick: () => set(state => ({ good: state.good + 1 })),
      handleNeutralClick: () => set(state => ({ neutral: state.neutral + 1 })),
      handleBadClick: () => set(state => ({bad: state.bad + 1 }))
    }
}))

export const goodFeedback = () => usefeedbackStore(state => state.good)
export const neutralFeedback = () => usefeedbackStore(state => state.neutral)
export const badFeedback = () => usefeedbackStore(state => state.bad)

export const useFeedbackControls = () => usefeedbackStore(state => state.actions)
