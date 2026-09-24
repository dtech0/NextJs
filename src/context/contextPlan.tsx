"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/component/library";

interface PlanContextType {
    todayPlan: Workout[];
    savedPlan: Workout[];
    doneIds: number[];
    addToPlan: (workout: Workout) => void;
    addToSaved: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;
    toggleDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
    const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
    const [savedPlan, setSavedPlan] = useState<Workout[]>([]);
    const [doneIds, setDoneIds] = useState<number[]>([]);

    useEffect(() => {
        const savedToday = localStorage.getItem("fitlog_today");
        const savedLater = localStorage.getItem("fitlog_saved");
        const savedDone = localStorage.getItem("fitlog_done");

        if (savedToday) setTodayPlan(JSON.parse(savedToday));
        if (savedLater) setSavedPlan(JSON.parse(savedLater));
        if (savedDone) setDoneIds(JSON.parse(savedDone));
    }, []);

    const addToPlan = (workout: Workout) => {
        if (todayPlan.some((w) => w.id === workout.id)) {
            alert("This workout is already in today's plan!");
            return;
        }
        if (todayPlan.length >= 5) {
            alert("Cap of 5 lifts reached for today! Finish them first.");
            return;
        }
        const updated = [...todayPlan, workout];
        setTodayPlan(updated);
        localStorage.setItem("fitlog_today", JSON.stringify(updated));
        alert(`${workout.name} added to Today's Plan!`);
    };

    const addToSaved = (workout: Workout) => {
        if (savedPlan.some((w) => w.id === workout.id)) {
            alert("This workout is already saved!");
            return;
        }
        const updated = [...savedPlan, workout];
        setSavedPlan(updated);
        localStorage.setItem("fitlog_saved", JSON.stringify(updated));
        alert(`${workout.name} saved for later!`);
    };

    const removeFromPlan = (id: number) => {
        const updated = todayPlan.filter((w) => w.id !== id);
        setTodayPlan(updated);
        localStorage.setItem("fitlog_today", JSON.stringify(updated));
    };

    const removeFromSaved = (id: number) => {
        const updated = savedPlan.filter((w) => w.id !== id);
        setSavedPlan(updated);
        localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    };

    const toggleDone = (id: number) => {
        const updated = doneIds.includes(id)
            ? doneIds.filter((item) => item !== id)
            : [...doneIds, id];
        setDoneIds(updated);
        localStorage.setItem("fitlog_done", JSON.stringify(updated));
    };

    return (
        <PlanContext.Provider
            value={{
                todayPlan,
                savedPlan,
                doneIds,
                addToPlan,
                addToSaved,
                removeFromPlan,
                removeFromSaved,
                toggleDone,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return context;
}
