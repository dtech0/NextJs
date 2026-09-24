"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/component/library";
import { toast } from "react-toastify";


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
            toast.error("Already in today's plan!");
            return;
        }
        if (todayPlan.length >= 5) {
            toast.error("Cap of 5 lifts reached for today! Finish them first.");
            return;
        }
        const updated = [...todayPlan, workout];
        setTodayPlan(updated);
        localStorage.setItem("fitlog_today", JSON.stringify(updated));
        toast.success("Added to Today's Plan!");
    };

    const addToSaved = (workout: Workout) => {
        if (savedPlan.some((w) => w.id === workout.id)) {
            toast.error("Already in saved list!");
            return;
        }
        const updated = [...savedPlan, workout];
        setSavedPlan(updated);
        localStorage.setItem("fitlog_saved", JSON.stringify(updated));
        toast.success(`${workout.name} saved for later!`);
    };

    const removeFromPlan = (id: number) => {
        const updated = todayPlan.filter((w) => w.id !== id);
        setTodayPlan(updated);
        localStorage.setItem("fitlog_today", JSON.stringify(updated));
        toast.success(`${removeFromPlan?.name || "Workout"} removed from plan`);
    };

    const removeFromSaved = (id: number) => {
        const updated = savedPlan.filter((w) => w.id !== id);
        setSavedPlan(updated); 
        localStorage.setItem("fitlog_saved", JSON.stringify(updated));
        toast.success(`${removeFromSaved?.name || "Workout removed from saved list"}`);
    };

    const toggleDone = (id: number) => {
        const isAlreadyDone = doneIds.includes(id);

        const updated = doneIds.includes(id)
            ? doneIds.filter((item) => item !== id)
            : [...doneIds, id];
        setDoneIds(updated);
        localStorage.setItem("fitlog_done", JSON.stringify(updated));
         if (isAlreadyDone) {
            toast("Marked as incomplete");
        } else {
            toast.success("Workout completed! Great job!");
        }
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
